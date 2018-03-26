module Statistics exposing (..)

import Array
import Dict
import Grid
import Html exposing (..)
import Html.Attributes exposing (..)
import Model exposing (GithubRepo, Model)
import Msg exposing (..)


maxBy : List GithubRepo -> (GithubRepo -> Int) -> Maybe GithubRepo
maxBy list extract =
    case Array.get 0 (Array.fromList list) of
        Nothing ->
            Maybe.Nothing

        Just initial ->
            Maybe.Just (List.foldr (findMax extract) initial list)


findMax : (GithubRepo -> Int) -> GithubRepo -> GithubRepo -> GithubRepo
findMax extract a b =
    if extract a > extract b then
        a
    else
        b


getMaxBySomething : List GithubRepo -> (GithubRepo -> Int) -> String -> Html msg
getMaxBySomething repos maxByExtract txt =
    let
        maxed =
            maxBy repos maxByExtract

        name =
            case maxed of
                Nothing ->
                    "Not found"

                Just repo ->
                    repo.name

        count =
            case maxed of
                Nothing ->
                    0

                Just repo ->
                    maxByExtract repo
    in
        p []
            [ b [] [ text txt ]
            , text (name ++ " (" ++ toString count ++ ")")
            ]


nofRepos : (List GithubRepo) -> Html msg
nofRepos repos =
    p []
        [ b [] [ text "Number of repositories: " ]
        , text (toString (List.length repos))
        ]


lastUpdated : (List GithubRepo) -> Html msg
lastUpdated repos =
    let
        lastUpdatedRepo =
            case Array.get 0 (Array.fromList repos) of
                Nothing ->
                    "Found no updated repos"

                Just repo ->
                    repo.name
    in
        p []
            [ b [] [ text "Latest update: " ]
            , text lastUpdatedRepo
            ]


mostWatchers : (List GithubRepo) -> Html msg
mostWatchers repos =
    getMaxBySomething repos (\repo -> repo.watchers_count) "Most watchers: "


mostForks : (List GithubRepo) -> Html msg
mostForks repos =
    getMaxBySomething (List.filter (\repo -> not repo.fork) repos) (\repo -> repo.forks_count) "Most forked: "


mostIssues : (List GithubRepo) -> Html msg
mostIssues repos =
    getMaxBySomething repos (\repo -> repo.open_issues_count) "Most open issues: "


mostStars : (List GithubRepo) -> Html msg
mostStars repos =
    getMaxBySomething repos (\repo -> repo.stargazers_count) "Most stars: "


gridConfig : Grid.Config -> Grid.Config
gridConfig config = { config | class = Maybe.Just "github__statistics" }

view : (List GithubRepo) -> Html Msg
view repos =
    Grid.view gridConfig [ nofRepos repos
                                       , lastUpdated repos
                                       , mostWatchers repos
                                       , mostForks repos
                                       , mostIssues repos
                                       , mostStars repos
                                       ]

