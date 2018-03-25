module Menu exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Msg exposing (Msg)



view: Html Msg
view = div [ class "clipper" ] [
        a [] [ text "Utgaard" ]
    ]