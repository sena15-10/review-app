class Api::V1::UsersController < ApplicationController
    # CSRFトークンの検証をスキップ（API用）
    skip_before_action :verify_authenticity_token
    def create
      @user = User.new(user_params)  
      puts "認証コードを発行しました"
      if @user.save
        # 認証コードを生成
        code = VerificationCodeService.generate_code(@user)
        # ここでメール送信処理を追加（後ほど実装）
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
        render json: { message: "認証が完了しました" }, status: :ok
      else
        render json: { message: result.error }, status: :unprocessable_entity
      end
    end
  
    def resend_code
      user = User.find_by(email: params[:email])
  
      if VerificationCodeService.can_resend?(user)
        code = VerificationCodeService.generate_code(user)
        # ここでメール送信処理を追加
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