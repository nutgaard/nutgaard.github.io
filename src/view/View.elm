module View exposing (..)

import ApplicationMain
import Footer
import Header
import Html exposing (..)
import Html.Attributes exposing (..)
import Menu
import Model exposing (..)
import Msg exposing (..)


view : Model -> Html Msg
view model =
    div [ class "application" ]
        [ Header.view
        , Html.map MenuMsg (Menu.view model.menu)
        , ApplicationMain.view model
        , Footer.view
        ]
