export class Encrypt {
  private salt = 'U3RyaW5nRm9vdA=='
  private utf8Chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[{]}|;:,<.>/?'
  private result = ''
  constructor(data: string) {
    const encodedSalt = this.encodeBase64(this.salt)
    this.encryptCedula(data, encodedSalt)
  }
  private encodeBase64(text: string): string {
    return btoa(encodeURIComponent(text).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(parseInt(p1, 16))))
  }
  private encryptCedula(cedula: string, encodedSalt: string) {
    const encryptedCedula = []

    for (let i = 0; i < cedula.length; i++) {
      const charCode = cedula.charCodeAt(i)
      const saltCharCode = encodedSalt.charCodeAt(i % encodedSalt.length)
      const encryptedCharCode = (charCode + saltCharCode + i) % this.utf8Chars.length
      const encryptedChar = this.utf8Chars.charAt(encryptedCharCode)
      encryptedCedula.push(encryptedChar)
    }

    this.result = encryptedCedula.join('')
  }
  public get(): string {
    return this.result
  }
}