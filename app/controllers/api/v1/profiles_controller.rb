class Api::V1::ProfilesController < ApplicationController
  include JwtAuthenticatable
  before_action :authenticate_user
  before_action :set_profile, only: [:show, :update]

  def show
    if @profile
      # プライバシー設定をチェック
      if @profile.is_public || @profile.user == current_user
        render json: format_profile_response(@profile)
      else
        render json: { error: 'このプロフィールは非公開です' }, status: :forbidden
      end
    else
      render json: { error: 'プロフィールが見つかりません' }, status: :not_found
    end
  end

  def create
    @profile = current_user.build_profile(profile_params)
    
    if @profile.save
      # スキルの保存
      save_skills(@profile, params[:skills]) if params[:skills]
      # ソーシャルリンクの保存
      save_social_links(@profile, params[:social_links]) if params[:social_links]
      
      render json: format_profile_response(@profile), status: :created
    else
      render json: { errors: @profile.errors }, status: :unprocessable_entity
    end
  end

  def update
    if @profile.update(profile_params)
      # アバター画像の処理
      @profile.avatar.attach(params[:avatar]) if params[:avatar]
      
      # スキルの更新
      update_skills(@profile, params[:skills]) if params[:skills]
      # ソーシャルリンクの更新
      update_social_links(@profile, params[:social_links]) if params[:social_links]
      
      render json: format_profile_response(@profile)
    else
      render json: { errors: @profile.errors }, status: :unprocessable_entity
    end
  end

  private

  def set_profile
    @profile = Profile.find_by(user_id: params[:id] || current_user.id)
  end

  def profile_params
    params.require(:profile).permit(
      :introduction, :is_public, :employment_status, 
      :experience_level, :years_of_experience, 
      :current_school, :current_company
    )
  end

  def format_profile_response(profile)
    {
      basic: {
        name: profile.user.name,
        email: profile.user.email,
        avatar_url: profile.avatar.attached? ? url_for(profile.avatar) : nil,
        introduction: profile.introduction,
        is_public: profile.is_public
      },
      status: {
        employment_status: profile.employment_status,
        experience_level: profile.experience_level,
        years_of_experience: profile.years_of_experience
      },
      current: {
        school: profile.current_school,
        company: profile.current_company
      },
      skills: {
        languages: profile.skills.where(category: 'language').pluck(:name),
        frameworks: profile.skills.where(category: 'framework').pluck(:name),
        databases: profile.skills.where(category: 'database').pluck(:name),
        tools: profile.skills.where(category: 'tool').pluck(:name)
      },
      social_links: profile.social_links.map { |link| { name: link.name, url: link.url } }
    }
  end

  def save_skills(profile, skills_data)
    skills_data.each do |skill_name|
      skill = Skill.find_or_create_by(name: skill_name, category: determine_category(skill_name))
      profile.profile_skills.create(skill: skill)
    end
  end

  def update_skills(profile, skills_data)
    profile.profile_skills.destroy_all
    save_skills(profile, skills_data)
  end

  def save_social_links(profile, social_data)
    social_data.each do |link_data|
      profile.social_links.create(
        name: link_data[:name],
        url: link_data[:url]
      )
    end
  end

  def update_social_links(profile, social_data)
    profile.social_links.destroy_all
    save_social_links(profile, social_data)
  end

  def determine_category(skill_name)
    # スキル名からカテゴリを判定するロジック
    case skill_name.downcase
    when /javascript|python|ruby|java|php/
      'language'
    when /rails|react|vue|django/
      'framework'
    when /mysql|postgresql|mongodb|sqlite|oracle/
      'database'
    else
      'tool'
    end
  end
end