module Msg exposing (..)

import Http
import Menu
import Model exposing (GithubRepo)


type Msg
    = Inc
    | ChangeTab Int (Cmd Msg)
    | NewExtra (Result Http.Error (List GithubRepo))
    | MenuMsg Menu.Msg
