module PagesView exposing (..)

import Dict
import Grid
import Html exposing (..)
import Html.Attributes exposing (..)
import Loader
import Model exposing (GithubRepo, Model)
import Msg exposing (Msg(NewExtra))
import Statistics
import Task


hasPages : GithubRepo -> Bool
hasPages repo =
    repo.has_pages


single : GithubRepo -> Html Msg
single repo =
    a [ class "github__repo github__repo--haspages", href ("//www.utgaard.xyz/" ++ repo.name ++ "/") ]
        [ h3 [] [ text repo.name ]
        , p [] [ text (repo.description |> Maybe.withDefault "") ]
        ]


gridConfig : Grid.Config -> Grid.Config
gridConfig config =
    { config | padElement = div [ class "github__emptyrepo" ] [] }


view : List GithubRepo -> List (Html Msg)
view repos =
    let
        filteredRepos =
            List.filter (\repo -> repo.has_pages) repos
    in
        [ Statistics.view filteredRepos, Grid.view gridConfig (List.map single filteredRepos) ]
