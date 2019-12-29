module RepoView exposing (..)

import Dict
import Grid
import Html exposing (..)
import Html.Attributes exposing (..)
import Loader
import Model exposing (GithubRepo, Model)
import Msg exposing (Msg(RepositoriesReq))
import Statistics
import Task


single : GithubRepo -> Html Msg
single repo =
    a [ class "github__repo github__repo--haspages", href ("//www.github.com/nutgaard/" ++ repo.name ++ "/") ]
        [ h3 [] [ text repo.name ]
        , p [] [ text (repo.description |> Maybe.withDefault "") ]
        ]


gridConfig : Grid.Config -> Grid.Config
gridConfig config =
    { config | padElement = div [ class "github__emptyrepo" ] [] }


view : List GithubRepo -> List (Html Msg)
view repos =
    [ Statistics.view repos, Grid.view gridConfig (List.map single repos) ]
