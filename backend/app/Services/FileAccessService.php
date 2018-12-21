<?php

namespace App\Services;

use Mockery\Exception;

/**
 * Class FileAccessService
 * @package App\Services
 */
class FileAccessService
{

    /**
     * File Categories.
     */
    const CATEGORY_ROUTING_CONFIG_FILES = 'routingConfigFiles';

    /**
     * Relative Routes to Base folder.
     */
    const DIR_ROUTING_FILES = '/app/Http/Routes';

    /**
     * @var array
     */
    private static $fileCache = array();

    /**
     * App Base Dir.
     * @var string
     */
    private $baseDir;

    /**
     * FileAccessService constructor.
     * @param $baseDir -> app folder dir.
     */
    public function __construct($baseDir)
    {
        $this->baseDir = $baseDir;
    }

    /**
     * Get File From File Cache
     * @param $category
     * @param $index
     * @param bool $complex
     * @return mixed
     *
     * @SuppressWarnings(PHPMD.BooleanArgumentFlag)
     */
    public function getFromCache($category, $index, $complex = false)
    {
        if (!$complex) {
            return self::$fileCache[$category][$index];
        }

        $parts = explode('/', $index);
        return self::$fileCache[$category][$parts[0]][$parts[1]];
    }

    /**
     * Get List of Files for provided File Category.
     * @param $category - Indicate a Category of files to be fetch.
     * @return array
     */
    public function getFiles($category)
    {
        if (!isset($this->fileCache[$category])) {
            $this->_loadFileCategory($category);
        }

        return self::$fileCache[$category];
    }

    /**
     * Load and Cache Files related to a certain category.
     * @param $category - File Category
     */
    private function _loadFileCategory($category)
    {
        $dir = $this->_getDirFromCategory($category);
        self::$fileCache[$category] = $this->_getFileList($dir, array());
    }

    /**
     * Get File Dir for File Category.
     * @param $category
     * @return mixed;
     * @throws Exception
     */
    private function _getDirFromCategory($category)
    {
        $dir = null;
        switch ($category) {
            case self::CATEGORY_ROUTING_CONFIG_FILES:
                $dir = $this->_generateDir(self::DIR_ROUTING_FILES);
                break;
            default:
                throw new Exception('File Category not specified');
        }
        return $dir;
    }

    /**
     * @param $relative - Relative path to the base dir.
     * @return string
     */
    private function _generateDir($relative)
    {
        return $this->baseDir . $relative;
    }

    /**
     * Get Files included in Folder dir provided and subfolders.
     * @param $dir - Base dir from which files will be read.
     * @param $fileArray - Array in which files will be loaded.
     * @param $json - Indicate if File content should be loaded as StdObject or plain string
     * @return array
     *
     * @SuppressWarnings(PHPMD.BooleanArgumentFlag)
     */
    private function _getFileList($dir, $fileArray, $json = true)
    {
        // Get Current Path Files/Suh directories
        $paths = scandir($dir);
        unset($paths[array_search('.', $paths, true)]);
        unset($paths[array_search('..', $paths, true)]);

        // Traverse and get Suh directories files or add files.to cachne
        foreach ($paths as $path) {
            $pathDir = $dir . '/' . $path;

            // If there is a subfolder include subfolder files.
            if (is_dir($pathDir)) {
                $fileArray[$path] = $this->_getFileList($pathDir, array());
                continue;
            }

            // Add file to the file list.
            $name = strstr($path, '.', true);
            $fileContent = $json ? json_decode(file_get_contents($pathDir)) : file_get_contents($pathDir);
            $fileArray[$name] = $fileContent;
        }

        return $fileArray;
    }

    /**
     * @param $dir
     * @param $file
     * @param $content
     */
    public function overrideFileContent($path, $file, $content)
    {
        $fileName = $this->baseDir . $path . $file;
        file_put_contents($fileName, $content);
    }
}
