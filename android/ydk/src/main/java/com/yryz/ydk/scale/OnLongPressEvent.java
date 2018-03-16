package com.yryz.ydk.scale;

import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.RCTEventEmitter;

/**
 * Created by heus on 2017/11/28.
 */

public class OnLongPressEvent extends Event<OnLongPressEvent> {

    public static final String EVENT_NAME = "onLongPress";

    public OnLongPressEvent(int viewTag) {
        super(viewTag);
    }

    @Override
    public String getEventName() {
        return EVENT_NAME;
    }

    @Override
    public void dispatch(RCTEventEmitter rctEventEmitter) {
        rctEventEmitter.receiveEvent(getViewTag(), getEventName(), null);
    }
}
