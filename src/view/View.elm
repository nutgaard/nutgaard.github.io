module View exposing (..)

import ApplicationMain
import Footer
import Header
import Html exposing (..)
import Html.Attributes exposing (..)
import Model exposing (..)
import Msg exposing (..)


view : Model -> Html Msg
view model =
    div [ id "root" ]
        [ Header.view
        , ApplicationMain.view model
        , Footer.view
        ]
