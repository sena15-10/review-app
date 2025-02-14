class VerificationCode < ApplicationRecord
  belongs_to :user

  # バリデーション
  validates :code, presence: true
  validates :expires_at, presence: true
  validates :last_sent_at, presence: true

  # 有効な認証コードのみを取得するスコープ
  scope :active, -> { where(verified: false)
                     .where('expires_at > ?', Time.current) }
  
  # メソッド
  def expired?
    expires_at < Time.current
  end

  def valid_code?
    !verified && !expired?
  end
end
