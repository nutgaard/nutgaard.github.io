module About exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Model exposing (Model)
import Msg exposing (Msg(RepositoriesReq))
import Task


onEnter : Model -> Cmd Msg
onEnter model =
    Cmd.none


view : Model -> Html Msg
view model =
    div [ class "about" ]
        [ h1 [] [ text "About" ]
        , pre [] [ text "This is where I would put the about section..." ]
        ]
