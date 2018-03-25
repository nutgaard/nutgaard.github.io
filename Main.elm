import Html exposing (..)
import Msg exposing (Msg)
import Model exposing (initialModel, Model)
import Update exposing (update)
import View exposing (..)

subscriptions: Model -> Sub Msg
subscriptions model = Sub.none

init : (Model, Cmd Msg)
init = (initialModel, Cmd.none)


main = Html.program {
    view = view,
    update = update,
    init = init,
    subscriptions = subscriptions
    }