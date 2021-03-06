import httpService from '@/utils/http'
import { IApiResponse } from '../types'
import { IUser, IUserSettings, IUserDashboard } from './types'

export function getAccount() {
  return httpService.request<any, IApiResponse<IUser>>({
    url: 'account',
    method: 'get'
  })
}

export function getDemoAccount(language: string, password: string) {
  const data = {
    language,
    password
  }

  return httpService.request<any, IApiResponse<string>>({
    url: 'account/demo',
    data,
    method: 'post'
  })
}

export function updateSettings(userSettings: IUserSettings) {
  const data = {
    fixed_header: userSettings.fixed_header,
    open_tags_view: userSettings.open_tags_view,
    theme_color: userSettings.theme_color,
    pagination_align: userSettings.pagination_align
  }

  return httpService.request<any, IApiResponse<any>>({
    url: 'account/settings',
    data,
    method: 'post'
  })
}

export function login(email: string, password: string) {
  const data = {
    email_or_username: email,
    password
  }

  return httpService.request<any, IApiResponse<IUser>>({
    url: 'account/token',
    data,
    method: 'post'
  })
}

export function register(email: string, password: string, language: string) {
  const data = {
    email,
    language,
    password
  }

  return httpService.request<any, IApiResponse<any>>({
    url: 'account/register',
    data,
    method: 'post'
  })
}

export function resetAccount(email: string) {
  const data = {
    email_or_username: email
  }

  return httpService.request<any, IApiResponse<any>>({
    url: 'account/reset',
    data,
    method: 'post'
  })
}

export function changePassword(password: string) {
  const data = {
    password
  }

  return httpService.request<any, IApiResponse<any>>({
    url: 'account/password',
    data,
    method: 'post'
  })
}

export function resetPassword(password: string, code: string) {
  const data = {
    password,
    security_code: code
  }

  return httpService.request<any, IApiResponse<any>>({
    url: 'account/reset-password',
    data,
    method: 'post'
  })
}

export function updateInfo(title: string, authorizedPersonName: string) {
  const data = {
    title,
    authorized_person_name: authorizedPersonName
  }

  return httpService.request<any, IApiResponse<any>>({
    url: 'account',
    data,
    method: 'patch'
  })
}

export function getDashboard() {
  return httpService.request<any, IApiResponse<IUserDashboard>>({
    url: 'dashboard',
    method: 'get'
  })
}
