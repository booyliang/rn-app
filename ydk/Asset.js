'use strict';

import { NativeModules, PixelRatio, Platform } from 'react-native';
import AssetRegistry from 'react-native/Libraries/Image/AssetRegistry';
import AssetSourceResolver from 'react-native/Libraries/Image/AssetSourceResolver';
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource';

import Constants from './Constants';

const FS = NativeModules.ExponentFileSystem;
export default class Asset {
  static byModule = {};

  constructor({ name, type, hash, uri, width, height }) {
    this.name = name;
    this.type = type;
    this.hash = hash;
    this.uri = uri;
    if (typeof width === 'number') {
      this.width = width;
    }
    if (typeof height === 'number') {
      this.height = height;
    }

    this.downloading = false;
    this.downloaded = false;
    this.downloadCallbacks = [];
  }

  


  async downloadAsync() {
    if (this.downloaded) {
      return;
    }
    if (this.downloading) {
      await new Promise((resolve, reject) =>
        this.downloadCallbacks.push({ resolve, reject })
      );
      return;
    }
    this.downloading = true;

    try {
      const localUri = `${FS.cacheDirectory}ExponentAsset-${this.hash}.${this
        .type}`;
      let exists, md5;
      ({ exists, md5 } = await FS.getInfoAsync(localUri, {
        cache: true,
        md5: true,
      }));
      if (!exists || md5 !== this.hash) {
        ({ md5 } = await FS.downloadAsync(this.uri, localUri, {
          cache: true,
          md5: true,
        }));
        if (md5 !== this.hash) {
          throw new Error(
            `Downloaded file for asset '${this.name}.${this.type}' ` +
              `Located at ${this.uri} ` +
              `failed MD5 integrity check`
          );
        }
      }
      this.localUri = localUri;
      this.downloaded = true;
      this.downloadCallbacks.forEach(({ resolve }) => resolve());
    } catch (e) {
      this.downloadCallbacks.forEach(({ reject }) => reject(e));
      throw e;
    } finally {
      this.downloading = false;
      this.downloadCallbacks = [];
    }
  }
}

// Override React Native's asset resolution for `Image` components

