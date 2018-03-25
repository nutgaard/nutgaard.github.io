module Statistics exposing (..)

import Array
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
        , text (name ++ "(" ++ toString count ++ ")")
        ]


nofRepos : Model -> Html msg
nofRepos model =
    p []
        [ b [] [ text "Number of repositories: " ]
        , text (toString (List.length model.repos))
        ]


lastUpdated : Model -> Html msg
lastUpdated model =
    let
        lastUpdatedRepo =
            case Array.get 0 (Array.fromList model.repos) of
                Nothing ->
                    "Found no updated repos"

                Just repo ->
                    repo.name
    in
    p []
        [ b [] [ text "Latest update: " ]
        , text lastUpdatedRepo
        ]


mostWatchers : Model -> Html msg
mostWatchers model =
    getMaxBySomething model.repos (\repo -> repo.watchers_count) "Most watchers: "


mostForks : Model -> Html msg
mostForks model =
    getMaxBySomething (List.filter (\repo -> not repo.fork) model.repos) (\repo -> repo.forks_count) "Most forked: "


mostIssues : Model -> Html msg
mostIssues model =
    getMaxBySomething model.repos (\repo -> repo.open_issues_count) "Most open issues: "


mostStars : Model -> Html msg
mostStars model =
    getMaxBySomething model.repos (\repo -> repo.stargazers_count) "Most stars: "


view : Model -> Html msg
view model =
    div [ class "grid github__statistics grid--small-1 grid--medium-2 grid--large-3" ]
        [ nofRepos model
        , lastUpdated model
        , mostWatchers model
        , mostForks model
        , mostIssues model
        , mostStars model
        ]
