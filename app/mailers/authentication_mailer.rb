class AuthenticationMailer < ApplicationMailer
    default from: '310kunsena7@gmail.com'
    def verification_email(user,code)
        @user = user 
        @code = code
        @expiration_time = 30.minutes.from_now # コードの有効期限
        @account_deletion_time = user.created_at + 24.hours
        Rails.logger.debug "Sending email to: #{@user.email}"
        Rails.logger.debug "User name: #{@user.name}"
        Rails.logger.debug "Code: #{@code}"

        mail(
            to: @user.email,
            subject: '認証コードのお知らせ'
          )

    end
end
