module Grid exposing (..)

import Dict exposing (Dict)
import Html exposing (..)
import Html.Attributes exposing (..)
import Model exposing (Model)
import Msg exposing (Msg)

type alias Config =
    { padElement: Html Msg
    , class: Maybe String
    }

defaultConfig : Config
defaultConfig =
    { padElement = div [] []
    , class = Maybe.Nothing
    }

simpleview : (List (Html Msg)) -> Html Msg
simpleview children = view (\config -> config) children

view : (Config -> Config) -> (List (Html Msg)) -> Html Msg
view modifyConfig children =
    let
        actualConfig = modifyConfig defaultConfig
        childLength = List.length children
        padSize = (((childLength // 3) + 1) * 3) - childLength
        paddingElements = List.repeat padSize actualConfig.padElement
        extraClass = actualConfig.class |> Maybe.withDefault ""
        classList =
            [ "grid"
            , extraClass
            , "grid--small-" ++ toString 1
            , "grid--medium-" ++ toString 2
            , "grid--large-" ++ toString 3
            ]
        classes = classList
            |> List.filter (\str -> not (String.isEmpty str))
            |> String.join " "
    in
        div [ class classes ] (List.append children paddingElements)
