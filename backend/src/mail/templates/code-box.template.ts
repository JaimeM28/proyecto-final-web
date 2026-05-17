export function codeBoxTemplate(code: string) {
  return `
    <div style="text-align:center; margin:28px 0;">
      <div style="display:inline-block; background-color:#eff6ff; color:#1d4ed8; border:1px solid #bfdbfe; border-radius:14px; padding:18px 32px; font-size:34px; font-weight:700; letter-spacing:6px;">
        ${code}
      </div>
    </div>
  `;
}