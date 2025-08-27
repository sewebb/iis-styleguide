<?php
namespace Deployer;

use Dotenv\Dotenv;

require 'recipe/common.php';
require 'contrib/slack.php';

require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Config
set('slack_text', '_{{user}}_ deploying `{{target}}` to *{{host}}*');
set('slack_success_text', 'Deploy to *{{host}}* successful');
set('slack_failure_text', 'Deploy to *{{host}}* failed');
set('repository', 'git@github.com:sewebb/iis-styleguide.git');
set( 'slack_webhook', $_SERVER[ 'SLACK_WEBHOOK' ] );
set( 'application', 'styleguide' );
set( 'keep_releases', 5 );

// Tasks
task(
	'build',
	function () {
		run('cd {{release_path}} && npm ci && npm run build');
	}
)->desc('Build app');

// Hosts
host( 'stage' )
	->setHostname( $_SERVER[ 'STAGE_HOSTNAME' ] )
	->setRemoteUser( $_SERVER[ 'STAGE_REMOTE_USER' ]  )
	->setDeployPath( $_SERVER[ 'STAGE_DEPLOY_PATH'] )
	->set( 'branch', 'develop' )
	->set( 'host', 'stage' );

host( 'prod' )
	->setHostname( $_SERVER[ 'PROD_HOSTNAME' ] )
	->setRemoteUser( $_SERVER[ 'PROD_REMOTE_USER' ]  )
	->setDeployPath( $_SERVER[ 'PROD_DEPLOY_PATH'] )
	->set( 'branch', 'master' )
	->set( 'host', 'prod' );

// Hooks
before('deploy', 'slack:notify');
after('deploy:shared', 'build');
after('deploy:failed', 'deploy:unlock');
after('deploy:failed', 'slack:notify:failure');
after('deploy:success', 'slack:notify:success');
