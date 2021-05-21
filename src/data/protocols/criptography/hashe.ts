export interface Hash {
    hash(password: string): Promise<string>
}
