module Tabs exposing (..)

import Array exposing (Array)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onClick)
import Model exposing (Model)
import Msg exposing (..)
import Navigation

type alias TabsConfig =
    List TabConfig


toTab : Model -> TabConfig -> Html Msg
toTab model tabConfig =
    let
        className =
            if model.locationHash == tabConfig.hash then
                "tabs__tabbutton tabs__tabbutton--isactive"
            else
                "tabs__tabbutton"
    in
        button [ class className, onClick (TabClick tabConfig) ] [ h2 [] [ text tabConfig.name ] ]


getContent : Model -> List TabConfig -> Html Msg
getContent model contentList =
    let
        selected = List.head (List.filter (\tc -> tc.hash == model.locationHash) contentList)
        markup = case selected of
            Nothing -> Html.div [] [ text "Could not find page" ]
            Just config -> div [ class "tabs__content" ] [ config.content model ]
    in
        markup

view : Model -> TabsConfig -> Html Msg
view model tabConfig =
    div [ class "tabs" ]
        (List.append (List.map (toTab model) tabConfig) [ getContent model tabConfig ])
