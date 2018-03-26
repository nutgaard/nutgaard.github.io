module Loader exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)

view : Html msg
view =
    div [ class "loader" ]
        [ span [] [ text "{" ]
        , span [] [ text "}" ]
        ]
