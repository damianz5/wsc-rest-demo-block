<?php

namespace EzSystems\RESTDemoBlockBundle\REST;


use GuzzleHttp\ClientInterface as GuzzleClient;

class JSONPlaceholder
{
    /** @var string */
    private $endpoint;

    /** @var GuzzleClient */
    private $guzzle;

    /**
     * @param $endpoint
     *
     * @param GuzzleClient $guzzleDriver
     */
    public function __construct($endpoint, GuzzleClient $guzzleDriver)
    {
        $this->endpoint = $endpoint;
        $this->guzzle = $guzzleDriver;
    }

    /**
     * @param $albumId
     *
     * @return string
     */
    public function getAlbum($albumId)
    {
        return $this->sendRequest('/albums/' . $albumId)->getBody()->getContents();
    }

    /**
     * @return array
     */
    public function listAlbums()
    {
        $albums = [];
        foreach (json_decode($this->sendRequest('/albums')->getBody()->getContents()) as $album) {
            $albums[$album->id] = $album->title;
        }

        return $albums;
    }

    /**
     * @param $albumId
     *
     * @return string
     */
    public function listPhotos($albumId)
    {
        return $this->sendRequest('/albums/' . $albumId . '/photos')->getBody()->getContents();
    }

    /**
     * @param $resource
     * @param string $method
     *
     * @return \Psr\Http\Message\ResponseInterface
     */
    protected function sendRequest($resource, $method = 'GET')
    {
        return $this->guzzle->request(
            $method,
            $this->endpoint . $resource
        );
    }

    /**
     * @return mixed
     */
    public function getEndpoint()
    {
        return $this->endpoint;
    }
}
