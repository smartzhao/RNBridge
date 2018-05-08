#待完善
# RNBridge [![](https://jitpack.io/v/zorozhao/RNBridge.svg)](https://jitpack.io/#zorozhao/RNBridge)
The library of the bridge between Android native and react native
## android

1.gradle

* Add it in your root build.gradle at the end of repositories

    	allprojects {
		repositories {
			maven { url 'https://jitpack.io' }
			maven {
        			   // All of React Native (JS, Android binaries) is installed from npm
     			       url "$projectDir/../../node_modules/react-native/android"//Fixme 增加RN库
       				 }
		}
	}
    	
* Add the dependency

		dependencies {
	    	    compile 'com.github.zorozhao:RNBridge:v0.19'
		}
   
 2. api
 
   * application
  	 public class MainApplication extends Application implements ReactApplication {
   
  	 @Override
  	 public void onCreate() {
  	 super.onCreate();
   
  	 RNBridgeManager.getInstance().init(this, new Callback() {
   		@Override
   		public void onResult(Object o) {
   
  		 }
   
  		 @Override
  		 public void onError(int i) {
   
  	 }
   
  		 @Override
   		public void onException(Throwable throwable) {
   
   		}
  	 });
   	}
   
   		@Override
   		public ReactNativeHost getReactNativeHost() {
   			return RNBridgeManager.getInstance().mReactNativeHost;
   		}
  	 }
   * Native  to RN
   
            RNBridgeManager.startRNActivity(MainActivity.this,"index.xxx.bundle","index.xxx","RnBase");
            or
            RNBridgeManager.startRNActivity(MainActivity.this,"RnBase", ReactInstanceManager.builder()
            .setApplication(getApplication())
            .setBundleAssetName("index.xxx.bundle")
            .setJSMainModulePath("index.xxx")
            .addPackage(new MainReactPackage())
            .setUseDeveloperSupport(true)
            .setInitialLifecycleState(LifecycleState.RESUMED)
            .build());
	    
## 联系方式15712893500	    
//![image](http://ykt-update.oss-cn-hangzhou.aliyuncs.com/other/weixin_photo/WechatIMG876.jpeg)

