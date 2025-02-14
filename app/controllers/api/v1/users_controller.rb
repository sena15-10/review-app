class Api::V1::UsersController < ApplicationController

    def create
      #同じメールアドレスがあればjsonデータで返す
      if User.exists?(email: user_params[:email])
        render json: {
          message: "このメールアドレスは既に登録されています",
          code: "email_taken"
        }, status: :conflict  # 409 Conflict
        return
      end
      @user = User.new(user_params)  
      if @user.save
        # 認証コードを生成
        code = VerificationCodeService.generate_code(@user)
        AuthenticationMailer.verification_email(@user, code).deliver_later
        render json: { message: "認証コードを送信しました" }, status: :created
      else
        render json: { 
          message: "登録に失敗しました", 
          errors: @user.errors.full_messages 
        }, status: :unprocessable_entity
      end
    end
  
    def verify
      user = User.find_by(email: params[:email])
      result = VerificationCodeService.verify(
        user_id: user.id,
        code: params[:code]
      )
  
      if result.success?
        render json: { 
          message: "認証が完了しました",
          }, status: :ok
        else
          render json: { message: result.error }, status: :unprocessable_entity
      end
    end
  
    def resend_code
      user = User.find_by(email: params[:email])
  
      if VerificationCodeService.can_resend?(user)
        code = VerificationCodeService.generate_code(user)
        AuthenticationMailer.verification_email(user, code).deliver_later
        render json: { message: "認証コードを再送信しました" }, status: :ok
      else
        render json: { message: "しばらく待ってから再試行してください" }, 
               status: :too_many_requests
      end
    end
  
      private
      
      def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
      end
  end
  # JWT tokenの生成（オプション）
  # token = JWT.encode(
  #   { user_id: user.id, exp: 7.days.from_now.to_i }, #一週間トークンを発行する
  #   Rails.application.credentials.secret_key_base
  # )

  #JWTとは？
  #JSON Web Token（JWT） は、APIの認証やセッション管理 に使われるデータフォーマット。
  #例えば、ログインしたらJWTを渡し、それを使ってAPIにアクセスできるようにする。        