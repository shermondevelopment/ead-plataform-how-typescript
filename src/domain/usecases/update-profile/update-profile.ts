export interface UpdateProfileParams {
    profile: string
    id: string
}

export interface UpdateProfile {
    setProfile(profile: UpdateProfileParams): Promise<string>
}
