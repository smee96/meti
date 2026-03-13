# [METI] QA & Release Checklist v0.2

## 스모크 테스트(수동 5분)
- [ ] 카드 생성 → 저장 → `/c/:id` 열림
- [ ] showPhone/showEmail 토글 반영
- [ ] QR 스캔 → 동일 페이지 열림

## 보안/프라이버시
- [ ] private 카드 외부 접근 차단
- [ ] 로그에 전화/이메일 원문이 남지 않음

## 릴리즈
- [ ] README 또는 docs에 dev/build/run 10줄 내 문서화
- [ ] 환경변수 목록 문서화
