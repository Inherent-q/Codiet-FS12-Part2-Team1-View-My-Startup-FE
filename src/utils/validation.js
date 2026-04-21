// 투자 등록용
export function validateNewInvest({
  name,
  amount,
  comment,
  password,
  passwordConfirm,
  myCorp,
}) {
  if (!name?.trim()) return "투자자 이름 항목이 비어있습니다. 입력해 주세요!";
  if (!amount || isNaN(amount) || Number(amount) <= 0)
    return "투자 금액은 숫자만 입력 가능하며, 0보다 커야 합니다!";
  if (!comment?.trim())
    return "투자 코멘트 항목이 비어있습니다. 입력해 주세요!";
  if (!password?.trim()) return "비밀번호 항목이 비어있습니다. 입력해 주세요!";
  if (!passwordConfirm?.trim())
    return "비밀번호 확인 항목이 비어있습니다. 입력해 주세요!";
  if (password.length < 8) return "비밀번호는 최소 8자리 이상이어야 합니다!";
  if (password !== passwordConfirm) return "비밀번호가 일치하지 않습니다.";
  if (!myCorp?.id) return "투자할 기업 정보가 없습니다. 다시 시도해 주세요.";
  return null;
}

// 투자 수정용
export function validateEditInvest({ name, amount, comment, password }) {
  if (!name?.trim()) return "투자자 이름을 입력해주세요.";
  if (!amount || isNaN(amount) || Number(amount) <= 0)
    return "투자 금액을 입력해주세요.";
  if (!comment?.trim()) return "투자 코멘트를 입력해주세요.";
  if (!password?.trim()) return "비밀번호를 입력해주세요.";
  return null;
}
