export interface Games {
    games: Game[]
}

export interface Game {
    game_id: string // game objectId, hexstring
    name: string
}