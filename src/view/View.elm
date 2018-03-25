module View exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Model exposing (..)
import Msg exposing (..)

import Header
import Footer

view: Model -> Html Msg
view model =
    div [ id "root" ] [
         Header.view
         , Footer.view
    ]