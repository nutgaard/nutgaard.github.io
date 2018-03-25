module Header exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Msg exposing (Msg)

view: Html Msg
view = Html.header [ class "header dark" ] [
        h1 [] [ text "Utgaard" ]
    ]