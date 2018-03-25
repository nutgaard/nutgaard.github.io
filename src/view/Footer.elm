module Footer exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Msg exposing (Msg)

view: Html Msg
view = Html.footer [ class "footer dark" ] [
        h1 [] [ text "Utgaard" ]
    ]