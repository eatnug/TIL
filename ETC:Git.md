# Git:Basic

Git의 기본 원리와 Github을 이용한 다른 사용자와의 협업 방법을 정리해보았다.

## Git?

Git, Github, Git flow 등 다들 Git, Git 하는데 도대체 Git이 뭐길래 그럴까? 구글에 검색해보면 Git은 분산형 __버전 관리 시스템(Version Control System)__ 이라고 한다. 버전 관리 시스템이 무엇일까? 무슨 버전을 관리한다는 거지? 

학교에서 팀플을 해본 사람이라면 다음과 같은 파일명들이 낯설지만은 않을 것이다. `최종.ppt, 최종2.ppt, 진짜최종.ppt, 진짜제발최종.ppt`. 완성했다고 생각한 문서도 종종 수정해야할 사항이 발생하고 내용을 고치다 보면 여러 버전의 파일이 존재하게 된다. 이런 경우는 소프트웨어 개발에서도 흔히 발생하는데 프로젝트가 크고 복잡해지거나 여러명이서 작업하는 경우 한 부분의 코드를 수정했더니 다른부분에서 버그가 발생해버리는 경우가 빈번히 발생한다. 심지어 소프트웨어는 한 버전마다 여러개의 파일을 수정할 일 도 많고, 다시 과거의 파일을 확인하거나 심지어 그 상태로 돌아가야하는 경우도 있다. 이런 여러가지 버전을 관리하는 시스템을 바로 __버전관리시스템, VCS__ 라고 하고, Git은 그 중 하나인 것이다. 즉 소스코드(혹은 다른 리소스) 파일들의 다양한 버전을 관리하는 프로그램이다. 그렇다면 Git은 어떻게 동작할까?

## Git은 어떻게 버전을 관리할까?

Git이 관리하는 파일 디렉토리를 Repository라고 하고 편히 레포라고 부른다. Git은 한 레포의 파일들을 `working area, staging area, HEAD`라고 하는 3가지 가상의 영역을 활용해 관리한다. `working`은 실제로 다루고 수정하는 코드들이 속한다. 어떤 프로젝트에서 최초로 Git을 사용하기 시작하면 모든 파일은 아직 시스템에 등록되지 않았기 때문에 이 영역에 속한다. `working area`의 파일(변경되었거나 시스템에 등록되지 않은 파일)의 변경사항을 반영하기 위해서는 먼저 해당 파일이 변경되었다고 시스템에 알려주어야 한다. 이를 `staging`이라고 하고 `stage`된 파일은 `staged area`로 이동한다. 그리고 `stage`된 변경사항들을 확정하면 해당 파일들은 `HEAD`로 이동한다. 여기서 주의할 점은 실제로 파일들이 이동하는 것은 아니고 파일의 상태(내용)을 캡쳐해서 각 가상의 영역에 위치시킨다는 것이다.

실제 스크립트와 함께 보자.

```bash

$ mkdir project # 프로젝트를 만든다. 

$ git init  # 해당 프로젝트 폴더를 Git으로 관리하겠다고 선언한다. 해당 폴더는 이제 Git Repository이다.

$ touch README.md   # 프로젝트에 README 파일을 추가한다.
                    # 이때 파일은 working area에 추가되고, HEAD는 여전히 비어있는 상태이다.

$ git add README.md # add 명령어로 README 파일을 stage한다. 

$ echo "change" > README.md # README 파일의 내용을 수정한다. 

$ git status # 현재 Git 시스템 내의 파일 상태를 확인한다.
```

`README.md` 파일을 만들고 해당 변경사항을 `stage` 한 뒤, `README.md` 파일을 수정했다. 이때 Git 시스템이 보는 파일들의 상태는 어떨까?

```      
커밋한 변경 사항

      새 파일: README.md

커밋하도록 정하지 않은 변경 사항:
      
      수정함: README.md

```

해당 결과는 `'README 파일의 생성'` 이라는 변경 사항은 stage 되어 `staging area`에 있고 `'README 파일의 수정'` 이라는 변경사항은 stage 되지 않고 `working area`에 있다는 뜻이다. 이때 `staging area`의 `README.md`는 빈 파일이고, `working area`의 `README.md`는 change라는 문자열이 적혀있는 파일이다.

다시 스크립트로 돌아가보자.

```bash 
$ git add README.md # README 파일에 존재하는 stage 되지 않은 변경사항을 마저 stage한다.

$ git commit -m " create & edit README.md " # staging area의 변경사항들을 수정 메시지와 함께 확정지어 HEAD로 이동시키는 명령이다.

$ git status 
```
```
커밋할 사항 없음, 작업 폴더 깨끗함
```
모든 변경사항이 확정되어서 HEAD로 옮겨졌고, working area나 staging area에 존재하는 항목이 없다는 의미이다.

이렇게 하면 Git의 기본적인 버전관리 기능을 사용한 것이다.

## Github?

그렇다면 Github은 또 뭘까? 지금의 Github은 여러가지 서비스를 제공해주지만 우리가 오늘 알아볼 기능은 레포지토리를 온라인에 저장할 수 있게 해주는 것이다. 내 PC의 파일들을 업로드 할 수도 있고, 웹에 올라온 레포지토리의 파일들을 내 PC로 내려받을 수도 있다. 그리고 이 둘을 연결할 수 도 있는데 이때 Github에 올라가 있는 저장소를 Remote 저장소, 내 PC에 저장된 저장소를 Local 저장소 라고 한다. 이렇게 Github에 저장소를 업로드 하는 것은 단순히 백업 뿐만 아니라 `fork`라는 다른 재미있는 기능도 가능하게 하는데, 이는 다른 사람의 저장소를 그대로 복제하는 기능이다. 그런데 아까 설명하지 않은 Git의 기능 중 `branch`도 비슷한 기능을 한다. 현재의 버전을 그대로 복사해서 새로운 버전을 만든다. 이 둘은 어떻게 다를까?

## Fork? Branch?

`fork`는 앞서 말한대로 Github 에 올라온 다른 저장소를 그대로 복사하는 것이다. 같은 내용을 가진 Github Repository를 추가한다. Github Repository의 파일은 권한을 가진 사용자만이 수정할 수 있는데, fork한 레포는 다른 사람의 레포를 복제해서 내가 만든 레포이기 때문에 내가 수정할 수 있다. 

`branch`는 Git Repository의 복제본을 만드는 것이다. 하지만 실제로 파일을 복제하는 것은 아니고 파일의 내용을 캡쳐하고 일종의 다른 평행세계를 만드는 것이다. 예를들어 `a`라는 브랜치를 만들고, 해당 브랜치에서 파일을 수정하고 커밋하면 `a` 브랜치에서는 파일이 수정되고 변경된 기록도 저장되지만 원본 브랜치(Git 레포 생성시 master 브랜치가 기본으로 생선된다.)에서는 파일이 수정되지 않고 `merge`라는 명령어로 직접 합쳐줘야한다. 이는 한 프로젝트에서 서로 다른 부분을 동시에 수정할 때 해당 부분의 파일만 독립적으로 작업하기 위해 사용하는 기능이다.

## Github 활용하기

아직 다소 추상적일 수 있기 때문에, 실제 스크립트와 함께 보자. 아까 활용했던 레포지토리를 다시 사용한다.

```bash 
# 사용자 A
# 우선 Github에 레포지토리를 하나 만든다.

$ (master) git remote add origin 'Github_Repo_URL' # 로컬의 Git 저장소와 Github의 저장소를 연결한다. 
                                                    # 원격 저장소의 이름은 origin 이라고 한다.

$ (master) git push origin master   # origin이라는 이름의 원격 저장소의 master 브랜치에 현재 저장소의 상태를 전송한다.
                                    # 이때 저장소의 상태는 변경이 확정된 HEAD를 사용한다.
```

이런 작업이 끝나면 사용자 A는 본인의 로컬 Git 저장소와 동기화 된 원격 Github 저장소를 갖게 된다.

사용자 B가 이 저장소 내용의 일부를 수정하고자 한다고 생각해보자.

```bash
# 사용자 B
# Github에 올라온 사용자 A의 저장소를 fork 한다.

$ git clone 'Forked_Repo_URL' # 포크한 내 Github 저장소를 내려받아 로컬 Git 저장소를 만든다.
                              # 원격 저장소의 이름은 자동으로 origin으로 설정된다.

$ (master) echo "change again" > README.md && git add README.md && git commit -m ", fork and edit repo " # 로컬 저장소의 내용을 수정하고 기록한다.

$ (master) git push origin master # 원본을 fork한 개 Github 저장소에 변경사항을 반영한다.
```

현재 존재하는 레포지토리들을 그림으로 살펴보면 다음과 같다.

<img src="https://github.com/EatNug/TIL/blob/master/statics/images/github.jpg" width="400" height="300">

각각 레포지토리의 `README.md`의 내용은 다음 표와 같다.

|레포지토리|README.md|
|---|---|
|A's local|'change'|
|A's remote|'change'|
|B's forked|'change, fork and edit repo'|
|B's local|'change, fork and edit repo'|

그렇다면 이때 이 변경사항을 어떻게 A의 저장소에 반영시킬까?

## Pull Request, Pull, Fetch, Merge

위의 사례에서 B의 Github Repo에 발생한 변경사항을 A의 원본 Github Repo에 반영해달라고 요청하는 것을 `Pull Request`라고 한다. PR은 Github 웹에서 요청할 수 있고 원본 저장소의 수정권한을 가진 사람이 해당 요청을 검토하고 승인하면 A의 원본 Github Repo가 변경된다. 하지만 이때에도 해당 Repo와 연결된 Local Repo의 내용은 변하지 않기 때문에 직접 변경사항을 적용해 주어야 한다. 

이러한 작업은 원격 저장소의 내용을 내려받는 명령어인 `pull`을 이용한다. 

```bash
$ (master) git pull origin master    # origin 원격 저장소의 master 브랜치의 내용을 로컬 저장소로 내려받고 현재의 HEAD에 merge 시키는 명령어이다.
```

여기까지 수행하면 네개의 Repo는 모두 같은 상태를 가지게 된다. 

그렇다면 만약 반대로 A가 내용을 수정한다면 어떻게 될까? 앞서 보았듯이 각각 Remote Repo와 Local Repo는 연결되어있기 때문에 서로 동기화가 가능한데, 두개의 Github Repo들은 그렇지 않아서 Github이 제공하는 기능을 이용해야한다. 하지만 안타깝게도 이전의 Pull Request의 반대가 되는 기능은 없기 때문에 마법처럼 원본 Github Repo의 변경사항을 fork된 Repo로 가져올수는 없다. 이를 위해서는 다음과 같은 복잡한 과정을 거친다.

- 원본 Github 저장소(A's remote)를 B's local에 원격 저장소로 추가하고,
- 해당 저장소에서 변경사항을 내려받는다.
- 해당 변경사항을 B's local에 적용(HEAD 영역의 파일을 변경)하고,
- B's local의 변경사항을 B's remote에 push해서 fork된 Github 저장소를 업데이트한다.

스크립트와 함께 확인해보자.

```bash
# 사용자 B의 로컬 저장소이다.

$ (master) git remote add upstream "A's_remote_URL" # 원본 Github 저장소를 원격 저장소로 추가한다.
                                                    # 이름은 보통 upstream이라고 한다.
$ (master) git fetch upstream   # upstream의 변경사항을 내려받는다. 
                                # 해당 변경사항은 upstream/master에 저장되고 로컬의 master에 반영되지는 않는다.
$ (master) git merge upstream/master  # upstream/master에 저장된 내려받은 사항을 현재 브랜치(master)에 반영한다. 
                                      # 이 단계에서 로컬 저장소는 동기화가 완료된다.

$ (master) git push origin master   # 로컬 저장소의 변경사항을 remote 저장소에 반영한다
                                    # 이제 fork한 저장소도 동기화 되었다.
```

복잡할 수도 있는 흐름이지만 성공적인 협업과 버전관리를 위해 꼭 익혀두자.