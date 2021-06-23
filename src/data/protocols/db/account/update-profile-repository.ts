export interface UpdatyeProfileParamsRepository {
    profile: string
    id: string
}

export interface UpdateProfileRepository {
    setProfile(profile: UpdatyeProfileParamsRepository): Promise<string>
}
