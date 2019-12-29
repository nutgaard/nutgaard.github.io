module Msg exposing (..)

import Html exposing (Html)
import Http
import Menu
import Model exposing (GithubRepo, Model)
import Navigation


type alias TabConfig =
    { name : String
    , content : Model -> Html Msg
    , onEnter : Model -> Cmd Msg
    , hash : String
    }


type Msg
    = UrlChange Navigation.Location
    | TabClick TabConfig
    | RepositoriesReq (Result Http.Error (List GithubRepo))
    | MenuMsg Menu.Msg
