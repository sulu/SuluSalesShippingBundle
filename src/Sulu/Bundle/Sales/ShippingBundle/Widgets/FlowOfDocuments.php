<?php
/*
 * This file is part of the Sulu CMS.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\Sales\ShippingBundle\Widgets;

use DateTime;
use Sulu\Bundle\AdminBundle\Widgets\WidgetException;
use Sulu\Bundle\AdminBundle\Widgets\WidgetParameterException;
use Sulu\Bundle\Sales\CoreBundle\Core\SalesDocument;
use Sulu\Bundle\Sales\CoreBundle\SalesDependency\SalesDependencyClassInterface;
use Sulu\Bundle\Sales\CoreBundle\Widgets\FlowOfDocuments as FlowOfDocumentsBase;
use Sulu\Bundle\Sales\OrderBundle\Api\Order;
use Sulu\Bundle\Sales\ShippingBundle\Api\Shipping;

class FlowOfDocuments extends FlowOfDocumentsBase
{
    protected $routes;

    protected $widgetName = 'ShippingFlowOfDocuments';

    function __construct(array $routes)
    {
        $this->routes = $routes;
    }

    /**
     * return name of widget
     *
     * @return string
     */
    public function getName()
    {
        return 'shipping-flow-of-documents';
    }

    /**
     * returns data to render template
     *
     * @param array $options
     * @throws WidgetException
     * @return array
     */
    public function getData($options)
    {
        if ($this->checkRequiredParameters($options)) {
            $this->getOrderData($options);
            $this->getShipppingData($options);
            parent::orderDataByDate(false);

            return parent::serializeData();
        } else {
            throw new WidgetException('No params found!', $this->getName());
        }
    }

    /**
     * Retrieves order data
     *
     * @param $options
     * @throws \Sulu\Bundle\AdminBundle\Widgets\WidgetParameterException
     */
    protected function getOrderData($options)
    {
        parent::addEntry(
            $options['orderId'],
            $options['orderNumber'],
            'order',
            new DateTime($options['orderDate']),
            parent::getRoute($options['orderId'], 'order', 'details'),
            parent::getRoute($options['orderId'], 'order', 'pdf')
        );
    }

    /**
     * Retrieves order data
     *
     * @param $options
     * @throws \Sulu\Bundle\AdminBundle\Widgets\WidgetParameterException
     */
    protected function getShipppingData($options)
    {
        parent::addEntry(
            $options['id'],
            $options['number'],
            'shipping',
            new DateTime($options['date']),
            parent::getRoute($options['id'], 'shipping', 'details'),
            Shipping::$pdfBaseUrl
        );
    }

    /**
     * @param $options
     * @return bool
     * @throws \Sulu\Bundle\AdminBundle\Widgets\WidgetParameterException
     */
    function checkRequiredParameters($options)
    {
        $attribute = "";
        if (!empty($options)) {

            if (empty($options['orderNumber'])) {
                $attribute = 'orderNumber';
            }

            if (empty($options['orderDate'])) {
                $attribute = 'orderDate';
            }

            if (empty($options['orderId'])) {
                $attribute = 'orderId';
            }

            if (empty($options['locale'])) {
                $attribute = 'locale';
            }

            if(empty($options['id'])){
                $attribute = 'id';
            }

            if(empty($options['date'])){
                $attribute = 'date';
            }

            if(empty($options['number'])){
                $attribute = 'number';
            }

            if (empty($attribute)) {
                return true;
            }

        } else {
            return false;
        }

        throw new WidgetParameterException(
            'Required parameter ' . $attribute . ' not found or invalid!',
            $this->widgetName,
            $attribute
        );
    }
}
