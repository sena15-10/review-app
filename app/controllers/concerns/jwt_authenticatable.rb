
module JwtAuthenticatable
    extend ActiveSupport::Concern
  
    def authenticate_user
      header = request.headers['Authorization']
      header = header.split(' ').last if header
  
      begin
        decoded = JWT.decode(header, Rails.application.credentials.secret_key_base)
        @current_user = User.find(decoded[0]['user_id'])
      rescue JWT::DecodeError
        render json: { message: '認証に失敗しました' }, status: :unauthorized
      end
    end
  
    def current_user
      @current_user
    end
end