//
//  FunctionMonitorView.m
//  yryzApp
//
//  Created by shibo on 2017/10/30.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "FunctionMonitorView.h"
#include <mach/task_info.h>
#include <mach/mach.h>


@interface FunctionMonitorView()
{
  NSTimeInterval lastTime;
  NSUInteger count;
}

@property (nonatomic, strong) CADisplayLink *displayLink;
@property (nonatomic, strong) UILabel *fpsLabel;  //帧
@property (nonatomic, strong) UILabel *cpuLabel; //cup
@property (nonatomic, strong) UILabel *memoryLabel; //内存
@property (nonatomic, strong) UIPanGestureRecognizer *pan;


@end

@implementation FunctionMonitorView

- (instancetype)initWithFrame:(CGRect)frame{
  self = [super initWithFrame:CGRectMake(10, 74, 70, 75)];
  if(self){

    self.fpsLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 0, 70, 20)];
    self.fpsLabel.font = [UIFont systemFontOfSize:14];
    self.fpsLabel.textColor = [UIColor whiteColor];
    self.fpsLabel.textAlignment = NSTextAlignmentCenter;
    self.fpsLabel.layer.cornerRadius = 5;
    self.fpsLabel.layer.masksToBounds = YES;
    self.fpsLabel.backgroundColor = [UIColor colorWithWhite:0.000 alpha:0.500];


    self.cpuLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 25, 70, 20)];
    self.cpuLabel.font = [UIFont systemFontOfSize:14];
    self.cpuLabel.textColor = [UIColor whiteColor];
    self.cpuLabel.textAlignment = NSTextAlignmentCenter;
    self.cpuLabel.layer.cornerRadius = 5;
    self.cpuLabel.layer.masksToBounds = YES;
    self.cpuLabel.backgroundColor = [UIColor colorWithWhite:0.000 alpha:0.500];


    self.memoryLabel = [[UILabel alloc] initWithFrame:CGRectMake(0, 50, 100, 20)];
    self.memoryLabel.font = [UIFont systemFontOfSize:14];
    self.memoryLabel.textColor = [UIColor whiteColor];
    self.memoryLabel.textAlignment = NSTextAlignmentCenter;
    self.memoryLabel.layer.cornerRadius = 5;
    self.memoryLabel.layer.masksToBounds = YES;
    self.memoryLabel.backgroundColor = [UIColor colorWithWhite:0.000 alpha:0.500];


    [self addSubview:_fpsLabel];
    [self addSubview:_cpuLabel];
    [self addSubview:_memoryLabel];


    self.pan = [[UIPanGestureRecognizer alloc]initWithTarget:self action:@selector(locationChange:)];
    self.pan.delaysTouchesBegan = NO;
    [self addGestureRecognizer:self.pan];


    self.displayLink = [CADisplayLink displayLinkWithTarget:self selector:@selector(handleDisplayLink:)];
    [self.displayLink addToRunLoop:[NSRunLoop mainRunLoop] forMode:NSRunLoopCommonModes];
  }
  return self;
}

- (void)handleDisplayLink:(CADisplayLink *)displayLink
{
  if (lastTime == 0) {
    lastTime = self.displayLink.timestamp;
    return;
  }
  count++;
  NSTimeInterval timeout = self.displayLink.timestamp - lastTime;
  if (timeout < 1) return;
  lastTime = self.displayLink.timestamp;
  float fps = count / timeout;
  count = 0;
  self.fpsLabel.text = [NSString stringWithFormat:@"%.f FPS",fps];
  self.cpuLabel.text = [NSString stringWithFormat:@"%.f CPU",[self cpuUsage]];
  self.memoryLabel.text = [NSString stringWithFormat:@"%ld Memory",[self memoryUsage]/1024];

}

//改变位置
- (void)locationChange:(UIPanGestureRecognizer*)p
{
  CGPoint panPoint = [p locationInView:[[UIApplication sharedApplication] keyWindow]];
  if(p.state == UIGestureRecognizerStateBegan)
  {
    [NSObject cancelPreviousPerformRequestsWithTarget:self selector:@selector(changeStatus) object:nil];

  }
  if(p.state == UIGestureRecognizerStateChanged)
  {
    self.center = CGPointMake(panPoint.x, panPoint.y);

  }else if(p.state == UIGestureRecognizerStateEnded){

    [self performSelector:@selector(changeStatus) withObject:nil afterDelay:1.0];

  }
}

- (void)changeStatus{

  [UIView animateWithDuration:0.5 animations:^{
    CGFloat x = self.center.x < 20+70/2 ? 0 :  self.center.x > SCREEN_WIDTH - 20 -70/2 ? SCREEN_WIDTH : self.center.x;
    CGFloat y = self.center.y < 40 + 75/2 ? 0 : self.center.y > SCREEN_HEIGHT - 40 - 75/2 ? SCREEN_HEIGHT : self.center.y;

    //禁止停留在4个角
    if((x == 0 && y ==0) || (x == SCREEN_WIDTH && y == 0) || (x == 0 && y == SCREEN_HEIGHT) || (x == SCREEN_WIDTH && y == SCREEN_HEIGHT)){
      y = self.center.y;
    }
    self.center = CGPointMake(x, y);
  }];
}

- (unsigned long)memoryUsage
{
  struct task_basic_info info;
  mach_msg_type_number_t size = sizeof(info);
  kern_return_t kr = task_info(mach_task_self(), TASK_BASIC_INFO, (task_info_t)&info, &size);
  if (kr != KERN_SUCCESS) {
    return -1;
  }
  unsigned long memorySize = info.resident_size >> 10;

  return memorySize;
}

- (CGFloat)cpuUsage
{
  thread_array_t         thread_list;
  mach_msg_type_number_t thread_count;
  thread_info_data_t     thinfo;
  mach_msg_type_number_t thread_info_count;
  thread_basic_info_t basic_info_th;

  // get threads in the task
  kern_return_t kr = task_threads(mach_task_self(), &thread_list, &thread_count);
  if (kr != KERN_SUCCESS) {
    return -1;
  }

  CGFloat tot_cpu = 0;

  for (int j = 0; j < thread_count; j++)
  {
    thread_info_count = THREAD_INFO_MAX;
    kr = thread_info(thread_list[j], THREAD_BASIC_INFO,(thread_info_t)thinfo, &thread_info_count);
    if (kr != KERN_SUCCESS) {
      return -1;
    }

    basic_info_th = (thread_basic_info_t)thinfo;

    if (!(basic_info_th->flags & TH_FLAGS_IDLE)) {
      tot_cpu = tot_cpu + basic_info_th->cpu_usage / (CGFloat)TH_USAGE_SCALE * 100.0;
    }

  } // for each thread
  //free mem
  kr = vm_deallocate(mach_task_self(), (vm_offset_t)thread_list, thread_count * sizeof(thread_t));
  assert(kr == KERN_SUCCESS);
  return tot_cpu;
}


@end
