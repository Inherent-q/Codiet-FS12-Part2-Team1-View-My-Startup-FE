// 투자 등록용
export function validateNewInvest({
  name,
  amount,
  comment,
  password,
  passwordConfirm,
  myCorp,
}) {
  if (!name?.trim())
    return {
      field: "name",
      message: "투자자 이름 항목이 비어있습니다. 입력해 주세요!",
    };
  if (name.trim().length > 5)
    return { field: "name", message: "이름은 6글자 이하입니다." };
  if (!amount || isNaN(amount) || Number(amount) <= 0)
    return {
      field: "amount",
      message: "투자 금액은 숫자만 입력 가능하며, 0보다 커야 합니다!",
    };
  if (!comment?.trim())
    return {
      field: "comment",
      message: "투자 코멘트 항목이 비어있습니다. 입력해 주세요!",
    };
  if (comment.trim().length > 100)
    return {
      field: "comment",
      message: "투자 코멘트는 최대 100자까지 입력 가능합니다!",
    };
  if (!password?.trim())
    return {
      field: "password",
      message: "비밀번호 항목이 비어있습니다. 입력해 주세요!",
    };
  if (/\s/.test(password))
    return {
      field: "password",
      message: "비밀번호에 공백을 포함할 수 없습니다!",
    };
  if (!passwordConfirm?.trim())
    return {
      field: "passwordConfirm",
      message: "비밀번호 확인 항목이 비어있습니다. 입력해 주세요!",
    };
  if (/\s/.test(passwordConfirm))
    return {
      field: "passwordConfirm",
      message: "비밀번호 확인에 공백을 포함할 수 없습니다!",
    };
  if (password.length < 8)
    return {
      field: "password",
      message: "비밀번호는 최소 8자리 이상이어야 합니다!",
    };
  if (password !== passwordConfirm)
    return {
      field: "passwordConfirm",
      message: "비밀번호가 일치하지 않습니다.",
    };
  if (!myCorp?.id)
    return {
      field: "myCorp",
      message: "투자할 기업 정보가 없습니다. 다시 시도해 주세요.",
    };
  return null;
}

// 투자 수정용
export function validateEditInvest({ name, amount, comment, password }) {
  if (!name?.trim())
    return { field: "name", message: "투자자 이름을 입력해주세요." };
  if (name.trim().length > 5)
    return { field: "name", message: "이름은 6글자 이하입니다." };
  if (!amount || isNaN(amount) || Number(amount) <= 0)
    return { field: "amount", message: "투자 금액을 입력해주세요." };
  if (!comment?.trim())
    return { field: "comment", message: "투자 코멘트를 입력해주세요." };
  if (comment.trim().length > 100)
    return {
      field: "comment",
      message: "투자 코멘트는 최대 100자까지 입력 가능합니다!",
    };
  if (!password?.trim())
    return { field: "password", message: "비밀번호를 입력해주세요." };
  if (/\s/.test(password))
    return {
      field: "password",
      message: "비밀번호에 공백을 포함할 수 없습니다!",
    };
  return null;
}
