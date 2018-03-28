module Main exposing (..)

import Html exposing (..)
import Model exposing (Model, initialModel)
import Msg exposing (Msg(UrlChange))
import Navigation
import Repos
import Update exposing (update)
import View exposing (..)


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


init : Navigation.Location -> ( Model, Cmd Msg )
init location =
    let
        model = initialModel location
        extraCmd = if String.length location.hash > 0
            then
                Cmd.none
            else
                Navigation.newUrl "#!pages"
    in
    ( model, Cmd.batch [ extraCmd, Repos.onEnter model ])


main =
    Navigation.program UrlChange
        { view = view
        , update = update
        , init = init
        , subscriptions = subscriptions
        }
