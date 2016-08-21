<?php
namespace EzSystems\RESTDemoBlockBundle\Block;

use EzSystems\RESTDemoBlockBundle\REST\JSONPlaceholder;
use EzSystems\LandingPageFieldTypeBundle\Exception\InvalidBlockAttributeException;
use EzSystems\LandingPageFieldTypeBundle\FieldType\LandingPage\Definition\BlockDefinition;
use EzSystems\LandingPageFieldTypeBundle\FieldType\LandingPage\Definition\BlockAttributeDefinition;
use EzSystems\LandingPageFieldTypeBundle\FieldType\LandingPage\Model\AbstractBlockType;
use EzSystems\LandingPageFieldTypeBundle\FieldType\LandingPage\Model\BlockValue;

/**
 * REST Demo block
 */
class RESTDemoBlock extends AbstractBlockType
{
    /** @var JSONPlaceholder */
    private $JSONPlaceholder;

    /**
     * RESTDemoBlock constructor.
     *
     * @param JSONPlaceholder $JSONPlaceholder
     */
    public function __construct(JSONPlaceholder $JSONPlaceholder)
    {
        $this->JSONPlaceholder = $JSONPlaceholder;
    }

    /**
     * Returns the parameters to the template.
     * To retrieve block attributes call $blockValue->getAttributes()
     *
     * {@inheritdoc}
     */
    public function getTemplateParameters(BlockValue $blockValue)
    {
        $albumId = $blockValue->getAttributes()['albumId'];
        $selectedPhotos = explode(',', $blockValue->getAttributes()['selectedPhotos']);
        return [
            'album' => json_decode($this->JSONPlaceholder->getAlbum($albumId)),
            'photos' => json_decode($this->JSONPlaceholder->listPhotos($albumId)),
            'selectedPhotos' => $selectedPhotos
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function createBlockDefinition()
    {
        return new BlockDefinition(
            'restdemo', // Block type (unique)
            'REST Demo', // Name of block
            'default', // Block category (currently unsupported)
            'bundles/ezsystemsrestdemoblock/images/restdemoblock.svg', // icon for thumbnail
            [], // extra views that can be hardcoded
            [
                new BlockAttributeDefinition(
                    'albumId', // Attribute's ID (unique)
                    'Album', // Attribute' name
                    'select', // Attribute's type
                    // Available options:
                    // - integer
                    // - string
                    // - url
                    // - text
                    // - embed
                    // - select
                    // - multiple
                    '/[^\\d+]/', // regex for frontend validation
                    'Album ID has to be an integer', // regex validation fail message
                    true, // is field required?
                    false, // should this attribute input be displayed inline to the previous?
                    [], // default value
                    $this->JSONPlaceholder->listAlbums() // available options (for select and multiple)
                ),

                new BlockAttributeDefinition(
                    'selectedPhotos',
                    'Selected Photos',
                    'multiple',
                    '',
                    '',
                    false,
                    false,
                    []
                ),
            ]
        );
    }

    /**
     * {@inheritdoc}
     */
    public function checkAttributesStructure(array $attributes)
    {
        if (!isset($attributes['albumId'])) {
            throw new InvalidBlockAttributeException(
                $this->getBlockDefinition()->getName(),
                'albumId',
                'Album ID must be set.'
            );
        }
    }
}
