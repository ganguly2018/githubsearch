
var git = angular.module('git',[]);

git.controller('gitSearchCtrl',['$scope'
	                            ,'$http'
	                            ,function($scope
	                            	     ,$http){
 
 var ctrl = this;
 ctrl.git ={};
 ctrl.showLists = false;
 // get user input from page
  ctrl.getUserName = function getUserName(){
  	if(ctrl.git.username){
  		$http.get('https://api.github.com/users/'+ctrl.git.username).then(function(response){
  			if(response.status == 200){
  				   ctrl.showLists= true;
	               ctrl.gitUserData = response.data;
	               ctrl.avatar_url = ctrl.gitUserData.avatar_url;
	               ctrl.repo_url = ctrl.gitUserData.repos_url;
	               ctrl.userName = ctrl.gitUserData.login;
	               ctrl.mainGitPage = ctrl.gitUserData.html_url;
	                //get repo data 
	                $http.get(ctrl.repo_url).then(function(repodata){
	                	if(repodata.status == 200){
	                	   ctrl.repolists = repodata.data;
	                	}else{
	                		alert('Sorry for the Error, please try again');
	                	}
	                });

	                //get git data 
	                $http.get('https://api.github.com/users/'+ctrl.git.username+'/gists').then(function(gistdata){
	                	
	                	if(gistdata.status == 200){
	                		ctrl.gistLists = gistdata.data;
	                	}else{
	                		alert('Sorry for the Error, please try again');
	                	}
	                })
  			}else{
  				alert('Sorry for the Error, please try again');
  			}
  		})
  	}else{
  		alert('Please enter an username');
  	}
  }
}])

