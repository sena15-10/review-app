# app/services/verification_code_service.rb
class VerificationCodeService
    def self.generate_code(user)
      code = sprintf('%06d', rand(000000..999999))
      
      verification_code = user.verification_codes.create!(
        code: code,
        expires_at: 10.minutes.from_now,
        last_sent_at: Time.current
      )
      
      code
    end
  
    def self.verify(user_id:, code:)
      verification = VerificationCode.find_by(
        user_id: user_id,
        code: code,
        verified: false
      )
  
      return OpenStruct.new(success?: false, error: "無効なコードです") unless verification
      return OpenStruct.new(success?: false, error: "コードの有効期限が切れています") if verification.expires_at < Time.current
      verification.update!(verified: true)
      verification.user.update!(confirmed_at: Time.current)
      OpenStruct.new(success?: true)
    end
  
    def self.can_resend?(user)
      last_code = user.verification_codes.last
      return true unless last_code
      
      last_code.last_sent_at < 1.minute.ago
    end
end