class AuthenticationMailer < ApplicationMailer
    default from: '310kunsena7@gmail.com'
    def verification_email(user,code)
        @user = user 
        @code = code
        @expiration_time = 30.minutes.from_now # コードの有効期限

        mail(
            to: @user.email,
            subject: '認証コードのお知らせ'
          )

    end
end
