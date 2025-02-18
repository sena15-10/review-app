class CleanupUnverifiedUsersJob < ApplicationJob
  queue_as :default

  def perform
    # 20時間経過したユーザーに警告メール
    warn_users = User.where(confirmed_at: nil)
                    .where('created_at < ?', 20.hours.ago)
                    .where('created_at > ?', 24.hours.ago)


    # 24時間経過したユーザーを削除
    User.where(confirmed_at: nil)
        .where('created_at < ?', 24.hours.ago)
        .find_each do |user| #一件ずつ抽出
          Rails.logger.info "Deleting unverified user: #{user.email}"
          user.destroy
        end
  end
end



