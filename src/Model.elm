module Model exposing (..)

import Menu
import Navigation


type alias GithubRepo =
    { has_pages : Bool
    , name : String
    , description : Maybe String
    , watchers_count : Int
    , fork : Bool
    , forks_count : Int
    , open_issues_count : Int
    , stargazers_count : Int
    , pushed_at : String
    }


type alias Model =
    { locationHash : String
    , repos : Maybe (List GithubRepo)
    , menu : Menu.Model
    , page : Int
    , reposDone: Bool
    }


initialModel : Navigation.Location -> Model
initialModel location =
    { locationHash = location.hash
    , repos = Maybe.Nothing
    , menu = Menu.initialModel
    , page = 1
    , reposDone = False
    }
