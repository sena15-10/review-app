class Api::V1::SessionsController < ApplicationController
    def create
        Rails.logger.info "Received params: #{params.inspect}"
        user = User.find_by(email: session_params[:email])
        unless user
            render json: {
                message: "登録されているメールアドレスはありませんでした"
            }, status: :not_found
            return
        end
        if user&.authenticate(session_params[:password])
            if user.confirm_at?
                token = JWT.encode(
                    {user_id: user_id,exp: 7.days.from_now.to_i},
                    Rails.application.credentials.secret_key_base
                )

                user.update!(last_login_at: Time.current)
                render json: {
                    message: "ログインに成功しました",
                    token: token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                },status: :ok
            else
                render json: { 
                    message: "メールアドレスの認証が完了していません"
                  }, status: :unauthorized
            end
        else
            render json: {
                message:"パスワードが正しくありません"
            },status: :unauthorized
        end
    end

    private
    def session_params
        params.require(:session).permit(:email, :password)
    end
end
