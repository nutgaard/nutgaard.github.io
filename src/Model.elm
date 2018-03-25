module Model exposing (..)

type alias Model = {
    count : Int,
    content: String
    }

initialModel: Model
initialModel = {
    count = 0,
    content = ""
    }