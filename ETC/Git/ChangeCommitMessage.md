rebase 명령어로 이전의 커밋 메시지를 수정하는 방법을 알아보자.

수정할 커밋의 로그를 확인하고 수정하겠다고 알려주자.

```bash
git rebase -i HEAD~N    // HEAD로 부터 N 번째 커밋까지 확인한다.
```

다음과 같은 결과를 확인할 수 있다. 수정하고자 하는 커밋의 `pick` 부분을 `edit`으로 변경하자
```bash
# edit으로 설정합니다.
edit 0a8829b 1
pick 8b2c3aa 2
pick f8483fc 33

# Rebase f18424f..f8483fc onto f18424f (3 commands)
#
# Commands:
# p, pick = use commit
# r, reword = use commit, but edit the commit message
# e, edit = use commit, but stop for amending
# s, squash = use commit, but meld into previous commit
# f, fixup = like "squash", but discard this commit's log message
# x, exec = run command (the rest of the line) using shell
# d, drop = remove commit
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

N번째 커밋 상태에서 다시 커밋하자.
```bash
git commit --amend
```

```bash
# 편집하고자 하는 내용을 작성합니다.
0   # 1을 0으로 바꾼다!

# Please enter the commit message for your changes. Lines starting          
# with '#' will be ignored, and an empty message aborts the commit.                   
#                                                                           
# Date:      Sun Feb 25 17:18:30 2018 +0900                                 
#                                                                           
# interactive rebase in progress; onto ff1bccd                              
# Last command done (1 command done):                                       
#    edit 0a8829b 1
# No commands remaining.                                                    
# You are currently editing a commit while rebasing branch 'master' on 'ff1bccd'.     
#                                                                           
# Changes to be committed:  

# 커밋이 바뀌는 파일
```

커밋 메시지가 바뀌었다. 나머지 커밋을 자동적으로 다시 생성? 하고 푸시하자.

```bash
git rebase --continue
git push -f
```

일단은 이렇게 한다 라는 것만 알아두고 rebase에 대해 다시 공부해보자.
## 참고

- [Git Commit Message 바꾸는 방법 by 김현정](http://tech.javacafe.io/2018/03/01/how-to-change-git-commit-message/)