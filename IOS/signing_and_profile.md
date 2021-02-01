## IOS Code Signing과 Provisioning Profile

IOS 개발하면서 가장 이해가 안되고 여전히 완전히 이해하지 못한 부분이다. fastlane을 이해하기 위해 간단히라도 정리하고 넘어간다.

IOS 앱을 개발하고 배포하기 위해서는 두가지가 필요하다. 앱을 빌드 하는 과정에서 애플이 허가한 개발자가 앱에 서명했고, 이후에 앱이 변조되지 않았다는 것을 보장하는 ___Code Signing___ 과 앱이 배포되고 설치되는 과정에서 특정 App ID가 제대로 서명되어서 의도된 기기에서 실행된다는 것을 보장해주는 ___Provisioning Profile___ 이 그것이다.

개발자는 애플에게 개발자 인증서를 요청하고, 이 인증서를 사용해 빌드파일에 서명을 하게된다. 그리고 해당 App ID와 인증서 그리고 타겟 디바이스의 정보를 담은 Provisioning Profile로 한번 더 확인이 끝난 후에 앱을 배포하게 되는것이다.

여기까지가 현재 이해하고 있는 사항이고, 해외의 한 개발자가 좀 더 명시적으로 이 과정을 정리해둔 글이 있어서 긁어왔다.

![](https://github.com/eaTnuG/TIL/blob/master/statics/images/applemaze.png)

1. Xcode가 설치되면 Intermediate Certificate 가 자동적으로 Keychain에 등록된다.
1. Certificate Signing Request가 생성된다.
1. CSR과 동시에 Private Key가 생성되어서 키체인에 등록된다.  
1. CSR을 업로드한다.
1. 애플이 이것저것 처리하고 Certificate 를 발급해준다.
1. Certificate를 PC에 내려받는다.
1. Certificate가 Keychain에 등록되고, 아까 생성된 Private Key와 함께 Code Signing Identity를 형성한다.
1. Certificate, App ID 그리고 Device Identifier의 정보로 Provisioning Profile을 생성하고 Xcode에 저장한다.
1. Xcode가 앱에 서명하고 기기에 Provisioning Profile을 등록한다.
1. iOS가 이것저것 다 처리한다. 즉 Provisioning Profile이 개발자가 사용한 Certificate로 서명되었고, 기기 ID가 올바르며 App ID가 정확한지를 확인한다.


### REF

- [What is a provisioning profile & code signing in iOS?](https://abhimuralidharan.medium.com/what-is-a-provisioning-profile-in-ios-77987a7c54c2)
- [iOS Code Signing & Provisioning in a Nutshell](https://medium.com/ios-os-x-development/ios-code-signing-provisioning-in-a-nutshell-d5b247760bef)
- [iOS Code Signing & Provisioning Profile 이해하기](https://m.blog.naver.com/mym0404/221611576550)
- [iOS 코드 서명에 대해서](https://engineering.linecorp.com/ko/blog/ios-code-signing/)