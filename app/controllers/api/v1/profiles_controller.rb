class Api::V1::ProfilesController < ApplicationController
    include JwtAuthenticatable
    before_action :authenticate_user
    before_action :set_profile, only: [:show]
    def show 
        set_profile #ほかのユーザーのデータだろうと同じように取得する
        get_profile #自分のデータと他のユーザーのデータを取得する
    end

    def create

    end

    def update

    end

    def get_profile
        render json: {
            user: {
                id: current_user.id,
                name: current_user.name,
                email: current_user.email,
                avatar_url: current_user.avatar_url,
                introduction: current_user.introduction,
                is_public: current_user.is_public,
                social_links: {
                    twitter: current_user.twitter,
                    github: current_user.github,
                    qiita: current_user.qiita
                },
                status: {
                    employment_status: current_user.employment_status,
                    experience_level: current_user.experience_level,
                    years_of_experience: current_user.years_of_experience
                },
                current: {
                    school: current_user.school,
                    company: current_user.company
                },
                skills: current_user.skills
            }
        }
    end

    private
    def set_profile
        @profle = Profile.find(params[:id])
    end
end
