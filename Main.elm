module Main exposing (..)

import Html exposing (..)
import Model exposing (Model, initialModel)
import Msg exposing (Msg)
import Update exposing (update)
import View exposing (..)


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none


init : ( Model, Cmd Msg )
init =
    ( initialModel, Cmd.none )


main =
    Html.program
        { view = view
        , update = update
        , init = init
        , subscriptions = subscriptions
        }
